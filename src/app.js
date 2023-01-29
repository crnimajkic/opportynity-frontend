import {JobSearch} from "./jobSearch"

const jobSearch = new JobSearch('#search-form','.result-container','.loading-element')
console.log(JobSearch.searchForm)
jobSearch.setCountryCode()
jobSearch.configureFormListener()