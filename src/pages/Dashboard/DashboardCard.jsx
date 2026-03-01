// DashboardCard.js

import propTypes from 'prop-types';
const DashboardCard = ({ title, content }) => {
  return (
    <div className="bg-white dark:bg-gray-400 border dark:text-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

DashboardCard.propTypes = {
  title: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
};

export default DashboardCard;
