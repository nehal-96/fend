import TOKEN from './config.js'
console.log(TOKEN)

/* Global Variables */
const apiKey = TOKEN;

const icons = document.getElementById('weather__icon').children
const app = document.getElementById('app')
const generateBtn = document.getElementById('generate')
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Get the data from the server 
const getData = async (url='') => {
    // fetch data
    const res = await fetch(url)

    // check recieved response
    try{
        const resData = await res.json();
        return(resData)
    } catch(error){
        console.log(error)
    }
}

// Post data to server 
const postData = async (url='', data={}) => {
    // send data to server
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try{
        return res
    } catch(error){
        console.log(error)
    }
}
/* update UI*/
async function updateUI(){
    getData('/updatedData').then(data=>{
        // update text content
        document.getElementById('temp').textContent = Math.round((Math.round(data.temp)-32) *5 / 9)+ '°C';
        document.getElementById('content').textContent = data.userFeelings;
        document.getElementById('date').textContent = data.date;
        let description = '';
        data.description.forEach(i=>{
            description += i + ' ,';
        })
        document.getElementById('description').textContent = description.slice(0, -1);
        // update weather icon
        data.condition.forEach(i=>{
            switch(i){
                case 'Thunderstorm':
                    icons[3].classList.remove('hidden')
                    icons[3].classList.add('thunder', 'lightening')
                    icons[4].classList.remove('hidden')
                    icons[4].classList.add('thunder')
                    icons[5].classList.replace('hidden', 'thunder_icon')
                    break;
                case 'Drizzle':
                    icons[3].classList.remove('hidden')
                    icons[4].classList.remove('hidden')
                    icons[0].classList.remove('hidden')
                    icons[3].classList.add('thunder')
                    icons[4].classList.add('thunder')
                    break
                case 'Rain':
                    icons[3].classList.remove('hidden')
                    icons[4].classList.remove('hidden')
                    icons[0].classList.remove('hidden')
                    break
                case 'Snow':
                    icons[3].classList.remove('hidden')
                    icons[4].classList.remove('hidden')
                    icons[1].classList.remove('hidden')
                    break
                case 'Clear':
                    icons[2].classList.remove('hidden')
                    break
                case 'Clouds':
                    icons[3].classList.remove('hidden')
                    icons[4].classList.remove('hidden')
                    break
                default:
                    icons[3].classList.remove('hidden')
                    icons[4].classList.remove('hidden')
                    icons[6].classList.remove('hidden')
                    icons[3].classList.add('thunder')
                    icons[4].classList.add('thunder')
            }
            

        })


        
    })
}
/* callbacks */
function generateData(){
    const zip = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`
    // change bg state
    app.classList.replace('darky', 'blur')
    // get the data from the api then store it to the server then update the UI
    getData(url).then((weatherData) => {
        if(weatherData.cod !== 200){
            console.log('404 Error')
            return 
        }
        const description=[];
        const condition=[];
        weatherData.weather.forEach(i => {
            description.push(i.description);
            condition.push(i.main);
        })

        const dataObj = {
            temp: weatherData.main.temp,
            date: newDate,
            userFeelings,
            description,
            condition

        }
        postData('/newEntry', dataObj)
    }).then(updateUI)


}

/* Events */
generateBtn.addEventListener('click', generateData)

