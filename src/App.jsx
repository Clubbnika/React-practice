/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import { UsersList } from './components/UsersList';
import { CategoryList } from './components/CategoryList';
import { ProductsList } from './components/ProductsList';

const getFilteredProducts = (products, filters) => {
  let filteredProducts = [...products];

  if (filters.query !== '') {
    const normalizedQuery = filters.query.trim().toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery),
    );
  }

  if (filters.userId !== null) {
    filteredProducts = filteredProducts.filter(
      product => product.user?.id === filters.userId,
    );
  }

  if (filters.categoryId !== null) {
    filteredProducts = filteredProducts.filter(
      product => product.category?.id === filters.categoryId,
    );
  }

  return filteredProducts;
};

const preparedProducts = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    categoryItem => categoryItem.id === product.categoryId,
  );
  const user = usersFromServer.find(
    userItem => userItem.id === category?.ownerId,
  );

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const filteredProducts = getFilteredProducts(preparedProducts, {
    query,
    userId: selectedUserId,
    categoryId: selectedCategoryId,
  });

  return (
    <div className="section">
      <div className="container">
        <div className="block">
          <nav className="panel">
            <p className="panel-heading has-background-white-ter has-text-dark">
              Filters
            </p>

            <p className="panel-tabs has-text-weight-bold">
              <UsersList
                users={usersFromServer}
                selectedUserId={selectedUserId}
                onSelect={setSelectedUserId}
              />
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value.trimStart())}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <CategoryList
              categories={categoriesFromServer}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={event => {
                  event.preventDefault();
                  setQuery('');
                  setSelectedUserId(null);
                  setSelectedCategoryId(null);
                  setSelectedProductId(null);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <ProductsList products={filteredProducts} />
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
