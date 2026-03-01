import { useEffect, useState } from 'react';
import RestService from '../../services/restaurant.service';
import CateService from '../../services/categorie.service';
import CategorieForm from './CategorieForm';
import ProductForm from './ProductForm';
import UpdateProductForm from './UpdateProductForm';
import ProductService from '../../services/product.service';
import Skeleton from './Skeleton';
import CategorieModifyForm from './CategorieModifyForm';
import Breadcrumbs from '../../components/Breadcrumbs';

const Menu = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [cateRestOwned, setCateRestOwned] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalModify, setShowModalModify] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const [categorieToAddProduct, setCategorieToAddProduct] = useState(null);
  const [categorieToModify, setCategorieToModify] = useState(null);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [applyIsActivatedFilter, setApplyIsActivatedFilter] = useState(true);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestService.getRestaurantByOwnerId();
        const restaurantOwned = response.data;
        setRestaurantOwned(restaurantOwned);
        if (restaurantOwned) {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${restaurantOwned.location.latitude}&lon=${restaurantOwned.location.longitude}&format=json`
          );
          const data = await response.json();
          setAddress(data.display_name);

          const responseCategories = await CateService.getCategoriesByRestaurantId(
            restaurantOwned.id
          );
          const categoriesRestaurantOwned = responseCategories.data;
          setCateRestOwned(categoriesRestaurantOwned);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleModalModify = category => {
    setCategorieToModify(category);
    setShowModalModify(!showModalModify);
  };

  const toggleIsActivatedFilter = () => {
    setApplyIsActivatedFilter(prevState => !prevState);
  };

  const toggleModalProduct = category => {
    setCategorieToAddProduct(category);
    setShowModalProduct(!showModalProduct);
  };

  const toggleUpdateProductModal = product => {
    setProductToUpdate(product);
    setShowUpdateProductModal(!showUpdateProductModal);
  };

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    minBonusPoints: 0,
    isActivated: true,
    searchName: '',
  });

  const handleFilterChange = (filterName, value) => {
    if (filterName === 'maxPrice' && value === '') {
      value = Infinity;
    }
    setFilters({ ...filters, [filterName]: value });
  };

  const deactivateProductHandler = async productId => {
    await ProductService.deactivateProductById(productId);
    updateCategories();
  };

  const activateProductHandler = async productId => {
    await ProductService.activateProductById(productId);
    updateCategories();
  };

  const updateCategories = async () => {
    const responseCategories = await CateService.getCategoriesByRestaurantId(restaurantOwned.id);
    const categoriesRestaurantOwned = responseCategories.data;
    setCateRestOwned(categoriesRestaurantOwned);
  };

  const getBreadcrumbs = () => {
    const paths = [
      { name: 'Home', url: '/' },
      { name: 'Menu', url: '/menu' },
    ];
    return paths;
  };

  return (
    <main className="profile-page">
      <Breadcrumbs paths={getBreadcrumbs()} />
      {loading ? (
        <Skeleton />
      ) : (
        <div>
          <section className="relative block py-16 bg-blueGray-200 dark:bg-gray-500">
            <div className="container mx-auto px-4">
              <div className="bg-white w-full mb-6 shadow-xl rounded-lg  dark:bg-gray-300 rounded overflow-hidden shadow-lg mx-auto my-4">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {restaurantOwned.name ? restaurantOwned.name : 'No restaurant added!'}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-map-marker-alt mr-2 text-lg"></i>
                    Location: {address ? address : 'No location'}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-kitchen-set text-lg"></i>
                    Cuisine: {restaurantOwned.cuisine ? restaurantOwned.cuisine : 'No cuisine'}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-phone mr-2 text-lg"></i>
                    Phone Number:{' '}
                    {restaurantOwned.phoneNumber ? restaurantOwned.phoneNumber : 'No phone number'}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-pen mr-2 text-lg"></i>
                    Description:{' '}
                    {restaurantOwned.description ? restaurantOwned.description : 'No Description'}
                  </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <div className="flex justify-between text-center">
                    <div className="p-3">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {restaurantOwned.id ? restaurantOwned.rating : 'None'}
                      </span>
                      <span className="text-sm text-blueGray-400">Rating</span>
                    </div>
                    <div className="p-3">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {restaurantOwned.id ? restaurantOwned.likes : 'None'}
                      </span>
                      <span className="text-sm text-blueGray-400">Likes</span>
                    </div>
                    <div className="p-3">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {restaurantOwned.priceRange ? restaurantOwned.priceRange : 'None'}
                      </span>
                      <span className="text-sm text-blueGray-400">Price Range</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg dark:bg-gray-300">
                {cateRestOwned && (
                  <div className="py-10 border-t border-blueGray-200">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-11/12 px-4">
                        <h3 className="mb-4 text-lg font-bold">Categories:</h3>
                        <button
                          onClick={toggleModal}
                          className="mb-4 bg-tertiary hover:bg-[#007B82] text-white font-bold py-2 px-4 rounded"
                        >
                          Add New Category
                        </button>
                        <span className="m-6 flex items-center justify-center">
                          <p className="rounded-md bg-gray-200 px-4 py-2 mr-2">Filter:</p>
                          <input
                            type="number"
                            value={filters.minPrice}
                            onChange={e => handleFilterChange('minPrice', e.target.value)}
                            placeholder="Minimum Price"
                            className="rounded-md px-4 py-2 mr-2"
                          />
                          <input
                            type="number"
                            value={filters.maxPrice}
                            onChange={e => handleFilterChange('maxPrice', e.target.value)}
                            placeholder="Maximum Price"
                            className="rounded-md px-4 py-2 mr-2"
                          />
                          <input
                            type="number"
                            value={filters.minBonusPoints}
                            onChange={e => handleFilterChange('minBonusPoints', e.target.value)}
                            placeholder="Minimum Bonus Points"
                            className="rounded-md px-4 py-2 mr-2"
                          />
                          <button
                            className={`rounded-md p-2 ${
                              applyIsActivatedFilter
                                ? 'bg-tertiary hover:bg-[#007B82] text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                            }`}
                            onClick={toggleIsActivatedFilter}
                          >
                            {applyIsActivatedFilter ? 'Activated Only' : 'All Products'}
                          </button>
                          <input
                            type="text"
                            value={filters.searchName}
                            onChange={e => handleFilterChange('searchName', e.target.value)}
                            placeholder="Search by Product Name"
                            className="rounded-md px-4 py-2 ml-2"
                          />
                        </span>

                        {cateRestOwned.map(category => (
                          <div
                            key={category.id}
                            className="mb-6 border rounded-lg p-4 bg-white shadow-md"
                          >
                            <h4 className="text-xl font-semibold">{category.name}</h4>
                            <ul className="list-disc ml-6">
                              <section className="text-gray-600 body-font">
                                <div className="container px-5 py-8 mx-auto">
                                  <div className="flex flex-wrap -m-4">
                                    {category.products
                                      .filter(product => {
                                        const isActivatedCondition = applyIsActivatedFilter
                                          ? product.isActivated === filters.isActivated
                                          : true;

                                        return (
                                          product.price >= filters.minPrice &&
                                          product.price <= filters.maxPrice &&
                                          product.bonusPoints >= filters.minBonusPoints &&
                                          isActivatedCondition &&
                                          product.name
                                            .toLowerCase()
                                            .includes(filters.searchName.toLowerCase())
                                        );
                                      })
                                      .map(product => (
                                        <div
                                          className="lg:w-1/4 md:w-1/2 p-8 w-full relative group"
                                          key={product.id}
                                        >
                                          <div className="relative overflow-hidden">
                                            <a
                                              className="block relative overflow-hidden rounded"
                                              style={{
                                                width: '100%',
                                                paddingBottom: '100%',
                                                position: 'relative',
                                                borderRadius: '16px 16px 0 0',
                                              }}
                                            >
                                              <img
                                                alt="ecommerce"
                                                className="absolute inset-0 object-cover object-center w-full h-full block"
                                                src={
                                                  'http://localhost:8080/api/product/files/' +
                                                  product.img
                                                }
                                              />
                                            </a>
                                            <div
                                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                              style={{
                                                borderRadius: '16px 16px 0 0',
                                              }}
                                            >
                                              <button
                                                onClick={() => toggleUpdateProductModal(product)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2"
                                              >
                                                Update
                                              </button>
                                              {product.isActivated ? (
                                                <button
                                                  onClick={() =>
                                                    deactivateProductHandler(product.id)
                                                  }
                                                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                                >
                                                  Deactivate
                                                </button>
                                              ) : (
                                                <button
                                                  onClick={() => activateProductHandler(product.id)}
                                                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                                >
                                                  Activate
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                          <div
                                            className="border p-5 transition duration-300 hover:shadow-xl"
                                            style={{
                                              width: '100%',
                                              position: 'relative',
                                              borderRadius: '0 0 16px 16px',
                                              overflow: 'hidden',
                                            }}
                                          >
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                              {category.name}
                                            </h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">
                                              {product.name.length > 20
                                                ? product.name.substring(0, 20) + '...'
                                                : product.name}
                                            </h2>
                                            <p className="mt-1">${product.price}</p>
                                            <p className="mt-1 overflow-hidden overflow-ellipsis">
                                              {product.info.length > 80
                                                ? product.info.substring(0, 80) + '...'
                                                : product.info}
                                            </p>
                                          </div>{' '}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </section>
                            </ul>
                            <div>
                              <button
                                onClick={() => toggleModalModify(category)}
                                className="bg-tertiary hover:bg-[#007B82] text-white font-bold py-2 px-4 rounded mt-4 mr-4"
                              >
                                Modifier categorie
                              </button>
                              <button
                                onClick={() => toggleModalProduct(category)}
                                className="bg-tertiary hover:bg-[#007B82] text-white font-bold py-2 px-4 rounded mt-4"
                              >
                                Add New Product in {category.name}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <CategorieForm
                restaurantId={restaurantOwned.id}
                toggleModal={toggleModal}
                updateCategories={updateCategories}
              />
            </div>
          </div>
        </div>
      )}
      {showModalModify && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <CategorieModifyForm
                category={categorieToModify}
                toggleModal={toggleModalModify}
                updateCategories={updateCategories}
              />
            </div>
          </div>
        </div>
      )}
      {showModalProduct && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <ProductForm
                category={categorieToAddProduct}
                toggleModalProduct={toggleModalProduct}
                updateCategories={updateCategories}
              />
            </div>
          </div>
        </div>
      )}

      {showUpdateProductModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <UpdateProductForm
                product={productToUpdate}
                toggleUpdateProductModal={toggleUpdateProductModal}
                updateCategories={updateCategories}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Menu;
