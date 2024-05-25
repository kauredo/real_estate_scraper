import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { deleteBlogPost } from "../../../utils/setters";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { Editor } from "@tinymce/tinymce-react";

const BlogForm = ({ handleSubmit, initialValues }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditorChange = (content, editor) => {
    setValues({
      ...values,
      text: content,
    });
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    handleSubmit(values);
  };

  return (
    <form onSubmit={handleSubmitForm} className="my-6">
      <ActionBtns initialValues={initialValues} gap />
      {/* Title Field */}
      <div className="field mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label htmlFor="title" className="sm:w-1/4 w-full">
          Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={values.title || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Hidden Checkbox */}
      <div className="field mb-4 flex flex-row sm:items-center gap-2 sm:gap-4">
        <label htmlFor="hidden" className="w-1/4">
          Hidden:
        </label>
        <input
          type="checkbox"
          name="hidden"
          id="hidden"
          checked={values.hidden || false}
          onChange={e => setValues({ ...values, hidden: e.target.checked })}
          className="focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Meta Title Field */}
      <div className="field mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label htmlFor="meta_title" className="sm:w-1/4 w-full">
          Meta Title:
        </label>
        <input
          type="text"
          name="meta_title"
          id="meta_title"
          value={values.meta_title || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Meta Description Field */}
      <div className="field mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label htmlFor="meta_description" className="sm:w-1/4 w-full">
          Meta Description:
        </label>
        <textarea
          name="meta_description"
          id="meta_description"
          value={values.meta_description || ""}
          onChange={handleChange}
          rows={6}
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>

      {/* Text Area */}
      <div className="mb-4">
        <Editor
          apiKey="p0gber1mntbhnppg6z5hsb25l8vwr0qxirsy8u9jaor1usml"
          value={values.text || ""}
          key="tinymce-1"
          init={{
            width: "100%",
            height: 2000,
            menubar: false,
            toolbar: [
              "undo redo | blocks | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat",
              "image | link | media",
            ],
            plugins: [
              "insertdatetime lists media table help wordcount",
              "help",
              "image",
              "link",
            ],
            images_upload_url: "/tinymce_assets",
            images_upload_credentials: true,
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      <ActionBtns initialValues={initialValues} />
    </form>
  );
};

export default BlogForm;

const ActionBtns = ({ initialValues, gap = false }) => {
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  return (
    <div className={`flex items-center gap-2 ${gap && "mb-4"}`}>
      <button
        type="submit"
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Atualizar
      </button>
      {initialValues.id && (
        <>
          <HashLink
            to={`/blog/${initialValues.slug}`}
            className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ver post
          </HashLink>
          <HashLink
            onClick={e => {
              if (
                window.confirm("Are you sure you want to delete this item?")
              ) {
                e.preventDefault();
                deleteBlogPost(initialValues.id, setFlashMessage);
                navigate("/backoffice/blog_posts");
              }
            }}
            className="bg-red-500 hover:bg-red-700 p-2 rounded font-bold"
          >
            🗑️
          </HashLink>
        </>
      )}
    </div>
  );
};
