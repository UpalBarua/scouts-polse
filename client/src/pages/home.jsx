import { useEffect, useState } from 'react';
import axios from '../api/axios';
import PoleCard from '../components/pole-card/pole-card';

const HomePage = () => {
  const [poles, setPoles] = useState([]);

  useEffect(() => {
    const fetchPoles = async () => {
      try {
        const { data } = await axios.get('/pole');
        setPoles(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPoles();
  }, []);

  return (
    <main className="container grid">
      <h2 className="pb-5 text-2xl font-bold">Active Poles</h2>
      <div className="mx-auto space-y-4 max-w-2xl">
        {poles?.map((pole) => (
          <PoleCard key={pole._id} {...pole} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
