import type { Category } from '#/generated/prisma/client'
import Categories from './categories'

interface Props {
  categories: Category[]
}

function HomePage({ categories }: Props) {
  return (
    <section>
      <header className='py-6'>
        <Categories categories={categories} />
      </header>
      <h1 className="text-4xl font-bold">Welcome to Setuverse</h1>
      <p className="mt-4 text-lg">
        Setuverse is a platform for creating and sharing your own sets of cards.
      </p>
    </section>
  )
}

export default HomePage
