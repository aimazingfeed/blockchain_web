// import detectEthereumProvider from '@metamask/detect-provider';



const DetectProvider = async () => {
    // const detected = await detectEthereumProvider();
    // console.log(detected);
    if (window.ethereum) {
        return window.ethereum;
    } else if (window.web3) {
        return window.web3.currentProvider;
    } else {
        window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    
};

const detectProvider = () => {
    let provider;
    if (window.ethereum) {
        provider = window.ethereum;
    } else if (window.web3) {
        provider = window.web3.currentProvider;
    } else {
        window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
};
// {
//   "0": false,
//   "1": "0x0000000000000000000000000000000000000000",
//   "2": false,
//   "3": false,
//   "4": false,
//   "5": "0",
//   "6": "0",
//   "7": "0",
//   "8": "0",
//   "9": "0",
//   "10": "123",
//   "11": "400000000000000000",
//   "12": "https://www.wework.com/ideas/wp-content/uploads/sites/4/2020/10/Web_150DPI-2018_11_19_WW_SF_00860083_v1-1120x630.jpg",
//   "isOccupied": false,
//   "tenant": "0x0000000000000000000000000000000000000000",
//   "isAuction": false,
//   "hasEnded": false,
//   "opPayed": false,
//   "auctionTick": "0",
//   "auctionEndTime": "0",
//   "opDaysLeft": "0",
//   "opAmountLeft": "0",
//   "paymentTimestamp": "0",
//   "area": "123",
//   "monthlyPrice": "400000000000000000",
//   "imagePath": "https://www.wework.com/ideas/wp-content/uploads/sites/4/2020/10/Web_150DPI-2018_11_19_WW_SF_00860083_v1-1120x630.jpg"
// }

export default detectProvider;