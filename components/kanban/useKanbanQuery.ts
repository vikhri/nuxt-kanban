import {useQuery} from '@tanstack/vue-query'
import {DB_ID, COLLECTION_DEALS} from "~/app.constants";
import {KANBAN_DATA} from "~/components/kanban/kanban.data";
import type {IDeal} from "~/types/deals.types";

export function useKanbanQuery() {
  return useQuery({
    queryKey: [COLLECTION_DEALS],
    queryFn: async () => {
      try {
        const result = await DB.listDocuments(DB_ID, COLLECTION_DEALS);
        console.log('результат', result); // Посмотрите, какие данные возвращаются
        return result;
      } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
      }
      },
    select(data) {
      const newBoard = [...KANBAN_DATA]
      const deals = data.documents as unknown as IDeal[]

      for (const deal of deals) {
         const column = newBoard.find(col => col.id === deal.status)

         if(column) {
           column.items.push({
             $createdAt: deal.$createdAt,
             id: deal.$id,
             name: deal.name,
             price: deal.price,
             companyName: deal.customers?.name,
             status: column.id
           })
         }
        }

        return newBoard
      }
  },

  )
}
