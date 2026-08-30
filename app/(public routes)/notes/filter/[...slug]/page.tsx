import {
  defaultShouldDehydrateQuery,
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: NotesProps) {
  const { slug } = await params;

  const tag = slug && slug.length > 0 ? slug[0] : "all";
  const apiTag = tag === "all" ? undefined : tag;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });

  const initialPage = 1;
  const initialSearch = "";
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ["notes", initialPage, initialSearch, { tag }],
    queryFn: () =>
      fetchNotes({
        page: initialPage,
        perPage,
        search: initialSearch,
        tag: apiTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
