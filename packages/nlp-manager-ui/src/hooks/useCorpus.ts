import { AuditedCorpus } from "@nlp-manager/shared";
import { useQuery } from "react-query";
import { QueryHook } from "./types";

export const useCorpus: QueryHook<AuditedCorpus> = (id?: string) => {
  const queryOptions = {
    enabled: !!id,
    staleTime: Infinity, //TO DO change it to the right stale time
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };

  return useQuery<AuditedCorpus | undefined>(
    ["corpus", id],
    async () => {
      // react-query has some dumb update to typings
      const response = await window.nlpManagerBackend?.getCorpus(
        id
      );
      console.log('response in hook', response);
      return response;
    },
    {
      ...queryOptions,
    }
  );
};
