import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import PoleOption from './pole-option';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';

const PoleCard = ({ _id, options, title, description }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!selectedOption) {
        return toast.error('No option selected');
      }

      await axios.patch(`/pole/${_id}`, {
        userId: 'upal@mail.com',
        optionId: selectedOption._id,
      });

      toast.success('Vote submitted');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-2 w-full max-w-full rounded-lg shadow sm:p-6 bg-primary-900">
      <h3 className="text-lg font-bold text-white sm:text-xl md:text-2xl">
        {title}
      </h3>
      <p className="pb-3">{description}</p>
      <RadioGroup
        value={selectedOption}
        onChange={setSelectedOption}
        className="space-y-3">
        {options?.map((option) => (
          <PoleOption key={option._id} {...option} />
        ))}
      </RadioGroup>
      <div className="flex gap-3 justify-end items-center pt-4">
        <button className="font-medium px-5 py-2.5 rounded-lg bg-primary-700 border border-primary-600 shadow-sm flex items-center gap-1 text-center justify-center w-full sm:w-auto text-white">
          Change Vote
        </button>
        <button
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="font-medium px-5 py-2.5 rounded-lg bg-accent-500 flex items-center gap-1 shadow-sm border border-accent-500 w-full sm:w-auto text-center justify-center text-white disabled:opacity-50">
          {isSubmitting ? (
            <>
              <CgSpinner className="text-xl animate-spin" />
              <span>Submitting</span>
            </>
          ) : (
            <span>Submit Vote</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default PoleCard;
