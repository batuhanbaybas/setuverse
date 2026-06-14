type CreateSetupPageProps = {
  userName: string
}

function CreateSetupPage({ userName }: CreateSetupPageProps) {
  return (
    <section>
      <h1 className="text-4xl font-bold">Create Setup</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Welcome back, {userName}. Start building your card set.
      </p>
    </section>
  )
}

export default CreateSetupPage
