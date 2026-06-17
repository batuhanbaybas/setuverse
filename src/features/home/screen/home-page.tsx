
import Categories from '../components/categories/index'


function HomePage() {
  return (
    <section className="py-6 sm:py-8">
      <header className="pb-6">
        <Categories />
      </header>
      <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
        Welcome to Setuverse
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:mt-4 sm:text-lg">
        Setuverse is a platform for creating and sharing your own sets of cards.
      </p>
    </section>
  )
}

export default HomePage
