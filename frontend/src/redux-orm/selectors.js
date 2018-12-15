import { createSelector } from 'redux-orm'
import orm from './orm'

const dbStateSelector = (state) => state.db

const authorSelector = createSelector(
  orm,
  dbStateSelector,
  session => session.Author.all().toModelArray()
    .map(author =>
      ({
        ...author.ref,
        books: author.books.toRefArray().map(book => book.name)
      })
    )
)