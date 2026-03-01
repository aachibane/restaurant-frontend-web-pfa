import { useEffect, useRef, useState } from 'react';
import RestService from '../../services/restaurant.service';
import OrderService from '../../services/dashboard.service';
import DashboardCard from './DashboardCard';
import Chart from 'chart.js/auto';

const OrdersData = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  const calculateStats = orders => {
    if (!orders || orders.length === 0) {
      return { maxPrice: 0, minPrice: 0, avgPrice: 0 };
    }
    let total = 0;
    let max = orders[0].totalPrice;
    let min = orders[0].totalPrice;
    orders.forEach(order => {
      total += order.totalPrice;
      if (order.totalPrice > max) max = order.totalPrice;
      if (order.totalPrice < min) min = order.totalPrice;
    });
    return {
      maxPrice: max,
      minPrice: min,
      avgPrice: (total / orders.length).toFixed(2),
    };
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestService.getRestaurantByOwnerId();
        const restaurantOwned = response.data;
        setRestaurantOwned(restaurantOwned);
        const responseOrders = await OrderService.getOrdersByRestaurantId(restaurantOwned.id);
        setOrders(responseOrders.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (orders.length === 0) return;

    const timer = setTimeout(() => {
      const canvas = document.getElementById('orderChart');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: orders.map((_, index) => `Order ${index + 1}`),
          datasets: [
            {
              label: 'Total Price',
              data: orders.map(order => order.totalPrice),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [orders]);

  const stats = calculateStats(orders);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Orders for {restaurantOwned && restaurantOwned.name}
          </h2>
          <DashboardCard title="Total Orders" content={`Total: ${orders.length}`} />
          <div className="my-4">
            {orders.map(order => (
              <div key={order.id} className="mb-2 p-2 border rounded">
                <p>Order ID: {order.id}</p>
                <p>Total Price: ${order.totalPrice}</p>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-2">Order Statistics</h2>
          <p>Maximum Total Price: ${stats.maxPrice}</p>
          <p>Minimum Total Price: ${stats.minPrice}</p>
          <p>Average Total Price: ${stats.avgPrice}</p>
          <canvas id="orderChart" width="600" height="400"></canvas>
        </div>
      )}
    </div>
  );
};

export default OrdersData;
