import SuccessPage from '@/components/front/Confirmation/Confirmation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ConfirmationPage(props: PageProps) {
  const params = await props.params;
  return (
    <SuccessPage params={params} />
  )
}
