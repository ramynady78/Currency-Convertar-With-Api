function addCurrenciesToSelect(){
    const from = document.querySelector(".From");
    const to = document.querySelector(".To");

    fetch(`https://v6.exchangerate-api.com/v6/ba8d8e13dfa3a404b0e37942/latest/USD`)
        .then((response) => response.json())
        .then((data) => {
            const currencies = Object.keys(data.conversion_rates);

            currencies.forEach(currency => {
                const optionElement = `<option value="${currency}">${currency}</option>`;
                from.innerHTML += optionElement;
                to.innerHTML += optionElement;
            });
        })
        .catch(error => {
            console.error('Error fetching currencies:', error);
    });

}

addCurrenciesToSelect()










function convertCurrency(){
    const from = document.querySelector(".From").value;
    const to = document.querySelector(".To").value;
    const amount = document.querySelector(".amount").value;
    const resultinput = document.querySelector(".results");
    const fialedMass = document.querySelector(".field-massege");
    resultinput.value = 0.;
    if(from && to && amount){
        fetch(`https://v6.exchangerate-api.com/v6/ba8d8e13dfa3a404b0e37942/latest/${from}`)
            .then((response) => response.json())
            .then((date) => {
                const rate = date.conversion_rates[to];
                const result = (amount * rate).toFixed(2);
                resultinput.value = result;
                fialedMass.style.display = "none"
                


            }).catch((error) => {
                resultDiv.innerHTML = `something went wrong ${error}`;

            });

    }else{
    }

    
    
}


function changeCurrency (){



    const changeBtn = document.querySelector(".change");

    let rotate = 0 ;

    changeBtn.addEventListener("click", () => {
        rotate += 180;
        changeBtn.style.transform = `rotate(${rotate}deg)`;

        const fromElement = document.querySelector(".From");
        const toElement = document.querySelector(".To");
        const resultinput = document.querySelector(".results");
        const amount = document.querySelector(".amount");

    
        const fromValue = fromElement.value;
        const toValue = toElement.value;
    
        fromElement.value = toValue;
        toElement.value = fromValue;


        const amountValu = amount.value;
        const resultValue = resultinput.value;

        amount.value = resultValue;
        resultinput.value = amountValu;
        convertCurrency();
    });
}

changeCurrency();


document.querySelector(".amount").addEventListener(("input"), () => {
    convertCurrency();
    

})



function currencyAgaintEgp() {
    const importantCur = ["USD", "EUR", "GBP", "SAR", "AED", "KWD", "QAR", "JOD"];
    const screenDiv = document.querySelector(".currency-screen");
    
    const fetchPromises = importantCur.map(currency => 
        fetch(`https://v6.exchangerate-api.com/v6/ba8d8e13dfa3a404b0e37942/latest/${currency}`)
        .then(response => response.json())
    );

    Promise.all(fetchPromises)
        .then(results => {
            results.forEach((data, index) => {
                const rate = data.conversion_rates["EGP"];
                screenDiv.innerHTML += `
                <div class="againt-egp"> <p>${importantCur[index]}</p> <p>${rate.toFixed(2)} EGP</p></div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
        });
}

currencyAgaintEgp();

