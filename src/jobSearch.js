import {getCurrencySymbol, extractFormData} from './utils'
import { jobTemplate } from './templates'
export class JobSearch{
    constructor(
        searchFormSelector,
        resultsContainerSelector,
        loadingElementSelector
    ){
        this.searchForm = document.querySelector(searchFormSelector)
        this.resultsContainer = document.querySelector(resultsContainerSelector)
        this.loadingElement = document.querySelector(loadingElementSelector)

    }
    setCountryCode(){
        this.countryCode = 'gb'
        // this.setCurrencyCode()
        fetch('http://ip-api.com/json')
        .then(results => results.json())
        .then(results =>{
            // this.countryCode = results.countryCode.toLowerCase()

            this.setCurrencySymbol()
        })
    }

    setCurrencySymbol(){
      this.currencySymbol =   getCurrencySymbol(this.countryCode)
    }

    configureFormListener(){
        this.searchForm.addEventListener('submit', (event)=>{
            event.preventDefault()
            this.startLoading()
            this.resultsContainer.innerHTML = ''
            const {search, location} = extractFormData(this.searchForm)

            fetch(`http://localhost:3000/?search=${search}&location=${location}&country=${this.countryCode}`)
            .then(results => results.json())
            .then(({results}) =>{

                return results
                .map(job=>jobTemplate(job,this.currencySymbol))
                
            })
            .then(jobs => {
                this.stopLoading()
                this.resultsContainer.innerHTML = jobs})
        })
    }

    startLoading(){
       const spiner =  document.querySelector('.loading-element')


        spiner.classList.add('loading')
    }
    stopLoading(){
        const spiner =  document.querySelector('.loading-element')
 
 
         spiner.classList.remove('loading')
     }
}