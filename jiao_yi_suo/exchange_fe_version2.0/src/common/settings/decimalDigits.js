// 前端输入价格和数量时应该限制的小数位 ， amount - 数量 , 价格 - price
const decimaDigits = {
    contractType: {
        21: { amount: 2, price: 4, volume: 8, fee: 6 },
        31: { amount: 4, price: 8, volume: 8, fee: 6 },
        32: { amount: 4, price: 8, volume: 8, fee: 6 },
        33: { amount: 0, price: 8, volume: 8, fee: 8 },
        34: { amount: 0, price: 8, volume: 8, fee: 8 },
        // BTC交易区
        71: { amount: 4, price: 6, volume: 6, fee: 8 },
        72: { amount: 4, price: 6, volume: 6, fee: 8 },
        73: { amount: 0, price: 8, volume: 8, fee: 8 },
        74: { amount: 0, price: 8, volume: 8, fee: 8 },
        75: { amount: 0, price: 8, volume: 8, fee: 8 },
        76: { amount: 0, price: 8, volume: 8, fee: 8 },
        77: { amount: 0, price: 8, volume: 8, fee: 8 },
        78: { amount: 0, price: 8, volume: 8, fee: 8 },
        79: { amount: 0, price: 8, volume: 8, fee: 8 },
        80: { amount: 0, price: 8, volume: 8, fee: 8 },
        // ETH交易区
        92: { amount: 4, price: 5, volume: 5, fee: 8 },
        93: { amount: 0, price: 8, volume: 8, fee: 8 },
        95: { amount: 0, price: 8, volume: 8, fee: 8 },
        94: { amount: 0, price: 8, volume: 8, fee: 8 },
        96: { amount: 0, price: 8, volume: 8, fee: 8 },
        97: { amount: 0, price: 8, volume: 8, fee: 8 },
        98: { amount: 0, price: 8, volume: 8, fee: 8 },
        99: { amount: 0, price: 8, volume: 8, fee: 8 },
        100: { amount: 0, price: 8, volume: 8, fee: 8 },
    },
    currency: {
        101: 8,
        102: 6,
        103: 8,
        104: 8,
        105: 8,
        106: 8,
        107: 8,
        108: 8,
        109: 8,
        110: 8,
        111: 8
    },
    maxOTCAmount: 50000,// 法币交易最大购买金额
    minOTCAmount: 1000,// 法币交易最小购买金额
    currencyCode:{
        "BTC": 101,
        "ETH": 102,
        "LTC": 103,
        "XRP": 104,
        "VAAC": 105,
        "CSC": 106,
        "CFC": 107,
        "NLC": 108,
        "FTCT": 109,
        "DOGE": 110,
        "SWTC": 111
    }
}
export default decimaDigits;