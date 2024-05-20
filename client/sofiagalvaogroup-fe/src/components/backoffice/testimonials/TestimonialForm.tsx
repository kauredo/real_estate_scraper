import { useState } from "react";

const TestimonialForm = ({ handleSubmit, initialValues }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    handleSubmit(values);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
        <label htmlFor="name" className="w-1/4">
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
        <label htmlFor="text" className="w-1/4">
          Text:
        </label>
        <textarea
          name="text"
          id="text"
          value={values.text}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {initialValues.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm;
