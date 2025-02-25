import './style.css'

import { ArConnect } from 'arweavekit/auth'
import { getBalance } from 'arweavekit/wallet'

async function get_ar_balance() {
    if (! await ArConnect.isInstalled()) return -1
  const response = await ArConnect.connect({permissions :['ACCESS_ADDRESS']});  
  const address = await ArConnect.getActiveAddress();
  const balance = await getBalance({address : address, options : {winstonToAr : true}})
  return balance
}

async function show_bags() {

    let balance = await get_ar_balance()
    console.log('AR balance :', balance)

    const weagger_quote = `- "${Math.floor(balance)} AR ? That's a certified Weagger if i've ever seen one ! Come on in my friend, you are welcome here !"`
    const light_bag_quote = `- "${Math.floor(balance)} AR ? These bags seem a bit light my friend. Im sorry but we dont let lowcoiners in there. I will give you one more chance to accumulate, come back here when you have 100 AR or more"`
    const nocoiner_quote = `- "Not even 1 AR ? That's a bit embarassing. Follow me, we have a place for nocoiners like you. You will be right at home ! And don't forget to take your Filecoin bags with you "`
    const no_wallet_quote = `- "You dont even have the Wander wallet extension installed ? That's a bit embarassing. Follow me, we have a place for nocoiners like you. You will be right at home ! And don't forget to take your Filecoin bags with you "`


    if (balance >= 100) {
        document.getElementById('dumdumz_quote').innerText = weagger_quote
        document.getElementById('main_image').src = "https://arweave.dev/7mFoH-2NJ_4lNJpwviHFjjFzI6bJ2XLj1bdsM-umsTc"
    }
    else if (Math.floor(balance) == 0 ) {

        document.getElementById('dumdumz_quote').innerText = nocoiner_quote
        document.getElementById('main_image').src = "https://arweave.dev/VziDoXz7CZbFmdZPUpCRxfBO4p-dCTxuR6lQF0viFwg"
    }
    else if (balance == -1 ) {

        document.getElementById('dumdumz_quote').innerText = no_wallet_quote
        document.getElementById('main_image').src = "https://arweave.dev/VziDoXz7CZbFmdZPUpCRxfBO4p-dCTxuR6lQF0viFwg"
    }
    else {
        document.getElementById('dumdumz_quote').innerText = light_bag_quote
        
    }
}


document.getElementById('show_bags_button').addEventListener('click', show_bags);

