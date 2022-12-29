import { Audit, Corpus } from "@nlp-manager/shared";
import { useQuery } from "react-query";

export const useCorpora = () => {
  const queryOptions = {
    enabled: true,
    staleTime: Infinity, //TO DO change it to the right stale time
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };

  return useQuery<(Corpus & Audit)[]>(
    ["corpus"],
    async () => {
      // react-query has some dumb update to typings
      const response = await window.nlpManagerBackend?.getCorpora();
      return response || [];
    },
    {
      ...queryOptions,
    }
  );
};
