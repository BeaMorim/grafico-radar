import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

interface Title {
  plain_text: string
}

interface DatabaseItem {
  properties: {
    Pilar: {
      title: Array<Title>
    },
    Nível: {
      number: number
    }
  }
}

interface ChartValues {
  label: Array<string>,
  data: Array<number>
}



export async function submit(req:any) {
 
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const response = await notion.databases.query({
    database_id: "309633b9f084452c85631116486578ef",
  });

  let chartValues: ChartValues = {
    label: [],
    data: [],
  }

  let items = response.results as unknown as Array<DatabaseItem>
  
  items.forEach((element:DatabaseItem, index) => {

    chartValues.label[index] = element.properties.Pilar.title[0].plain_text
    chartValues.data[index] =element.properties.Nível.number
    
  });

  return chartValues;
}

export async function includeChart(chartImage:string) {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  await notion.blocks.children.append({
      block_id: "422110a407524aedb906b3ac63054157",
      children: [
        {
          "type": "heading_1",
          //...other keys excluded
          "heading_1": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "Lacinato kale",
                "link": null
              }
            }],
            "color": "default",
            "is_toggleable": false
          }
        },
        {
          "type": "image",
          //...other keys excluded
          "image": {
            "type": "external",
            "external": {
                "url": chartImage
            }
          }
        }
      ],
    });
    
  
}

// const response2 = await notion.blocks.retrieve({
//   block_id: "422110a407524aedb906b3ac63054157",
// });


// 
