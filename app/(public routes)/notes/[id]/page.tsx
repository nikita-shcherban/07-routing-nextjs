import {
  dehydrate,
  HydrationBoundary,
  queryOptions,
} from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = createQueryClient();

  const noteQueryOptions = queryOptions({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  await queryClient.prefetchQuery(noteQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
