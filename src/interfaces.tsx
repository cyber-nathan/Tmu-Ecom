// temp data to display 
export interface ProdItem {
    id: number;
    picture: string;
    prodName: string;
    price: number;
    owner: string;
    description: string;
  }

  export let ITEM: ProdItem[] = [
    {id: 0,
      picture: "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg",
      prodName: "prodName1",
      price: 100,
      owner: "Owner1",
      description: "this is where the description will go"
  
    },
  
    {id: 1,
      picture: "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg",
      prodName: "prodName2",
      price: 150,
      owner: "Owner2",
      description: "this is where the description will go"
  
    },
  
    {id: 2,
      picture: "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg",
      prodName: "prodName3",
      price: 50,
      owner: "Owner3",
      description: "this is where the description will go"
  
    },
  
    {id: 3,
      picture: "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg",
      prodName: "prodName4",
      price: 200,
      owner: "Owner4",
      description: "this is where the description will go"
  
    }
]