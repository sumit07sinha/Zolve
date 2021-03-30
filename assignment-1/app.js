//Store Data in the variables
let apiAddress = " https://api.stackexchange.com/2.2/search/advanced?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&";
let fetchedData;
const getApi = (inputs) => {
    inputs &&
        Object.values(inputs).forEach((input, index) => {
            if (input !== "") apiAddress = apiAddress.concat(`${Object.keys(inputs)[index]}=${input}`).concat("&");
        });
    const apiCall = apiAddress.substring(0, apiAddress.length - 1);
    return apiCall;
};
//fetch data from API
const fetchData = async (getApi) => {
    const response = await fetch(getApi);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};
// show retrieved data in solution box
const updateJSONDatainUI = async (fetchData) => {
    document.getElementById("uiUpdation").innerText = JSON.stringify(fetchData, undefined, 4);
};
// get question api for iframe
let getQuestionAPI = (questionAPI, questionId) => {
    let response = `${questionAPI}${questionId}/`;
    return response;
};

window.onload = () => {
    document.getElementById("submit").addEventListener("click", async () => {
        //inputs are stored in variables
        let page = document.getElementById("page").value;
        let pagesize = document.getElementById("pageSize").value;
        let fromdate = document.getElementById("fromDate").value;
        let todate = document.getElementById("toDate").value;
        let order = document.getElementById("order").value;
        let min = document.getElementById("minDate").value;
        let max = document.getElementById("maxDate").value;
        let sort = document.getElementById("sort").value;
        let q = document.getElementById("que").value;
        let accepted = document.getElementById("accepted").value;
        let answers = document.getElementById("ans").value;
        let body = document.getElementById("body").value;
        let closed = document.getElementById("closed").value;
        let migrated = document.getElementById("migrated").value;
        let notice = document.getElementById("notice").value;
        let notTagged = document.getElementById("notTagged").value;
        let tagged = document.getElementById("tagged").value;
        let user = document.getElementById("user").value;
        let url = document.getElementById("url").value;
        let views = document.getElementById("views").value;
        let wiki = document.getElementById("wiki").value;

        const inputs = {
            page,
            pagesize,
            fromdate: fromdate && new Date(fromdate).getTime() / 1000,
            todate: todate && new Date(todate).getTime() / 1000,
            order,
            min: min && new Date(min).getTime() / 1000,
            max: max && new Date(max).getTime() / 1000,
            sort,
            q,
            accepted,
            answers,
            body,
            closed,
            migrated,
            notice,
            notTagged,
            tagged,
            user,
            url,
            views,
            wiki,
        };
        console.log(getApi(inputs));
        fetchedData = await fetchData(getApi(inputs));
        renderFinalUI(fetchedData.items[0]);
        if(fetchedData){
            createButton(fetchedData);

        }
    });
};
// final output rendering
const renderFinalUI = (data) => {
    // makeIFrameFromdata(data);
    updateJSONDatainUI(data);
};

// pagination
const renderSelectedPage = (e) => {
    const selectedButtonIndex = e.target.getAttribute("data-button-index");
    let currentlyActive = document.getElementsByClassName("selected")[0];
    currentlyActive.classList.remove("selected");
    e.target.setAttribute("class", "selected");
    renderFinalUI(fetchedData.items[+selectedButtonIndex]);
};
//create buttons dynamically based upon the data.
let createButton = (data) => {
    for (let i = 0; i < data.items.length; i++) {
        let button = document.createElement("button");
        button.innerHTML = i + 1;
        button.setAttribute("data-button-index", i);
        button.setAttribute("class", "paginationNumbers");
        button.addEventListener("click", renderSelectedPage);
        document.getElementById("solutionBox").appendChild(button);
        if (i === 0) {
            button.classList.add("selected");
        }
    }
};
