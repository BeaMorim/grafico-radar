import { Client } from "@notionhq/client";
import Chart from 'chart.js/auto';
import dotenv from "dotenv";

dotenv.config();

interface Title {
  plain_text: string
}

interface DatabaseItem {
  properties: {
    Name: {
      title: Array<Title>
    }
  }
}



export async function submit(req:any) {
 
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const response = await notion.databases.query({
    database_id: "309633b9f084452c85631116486578ef",
  });

  let items = response.results as unknown as Array<DatabaseItem>
  
  items.forEach((element:DatabaseItem, index) => {
    console.log(element.properties.Name.title[0].plain_text)
  });
  

  return response;
}

// const response2 = await notion.blocks.retrieve({
//   block_id: "422110a407524aedb906b3ac63054157",
// });


// const response2 = await notion.blocks.children.append({
//   block_id: "422110a407524aedb906b3ac63054157",
//   children: [
//     {
//       "heading_2": {
//         "rich_text": [
//           {
//             "text": {
//               "content": "Lacinato kale"
//             }
//           }
//         ]
//       }
//     },
//     {
//       "paragraph": {
//         "rich_text": [
//           {
//             "text": {
//               "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
//               "link": {
//                 "url": "https://en.wikipedia.org/wiki/Lacinato_kale"
//               }
//             }
//           }
//         ]
//       }
//     }
//   ],
// });

