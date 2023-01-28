export async function submit(req) {
 
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
  
    const response = await notion.databases.query({
      database_id: "309633b9f084452c85631116486578ef",
    });
  
    let chartValues = {
      label: [],
      data: [],
    }
  
    let items = response.results 
    
    items.forEach((element, index) => {
  
      chartValues.label[index] = element.properties.Pilar.title[0].plain_text
      chartValues.data[index] =element.properties.Nível.number
      
    });
  
    return chartValues;
  }
  