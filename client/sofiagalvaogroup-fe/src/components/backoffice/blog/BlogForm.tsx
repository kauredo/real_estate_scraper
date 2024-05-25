import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import {
  createBlogPhoto,
  deleteBlogPhoto,
  deleteBlogPost,
} from "../../../utils/setters";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { Editor } from "@tinymce/tinymce-react";
import { API_URL } from "../../../utils/getters";
import { Photo } from "../../utils/Interfaces";

const BlogForm = ({ handleSubmit, initialValues }) => {
  const [values, setValues] = useState(initialValues);
  const { setFlashMessage } = useFlashMessage();

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      Array.from(e.target.files).forEach((file: File, index: number) => {
        // Append the file to the form data as an array of files
        formData.append("file", file, file.name);
      });

      const newPhotos = Array.from(e.target.files).map(
        (file: File) =>
          ({
            id: 0,
            image: { url: URL.createObjectURL(file) },
            main: false,
          } as unknown as Photo)
      );

      setValues({
        ...values,
        blog_photos: [...values.blog_photos, ...newPhotos],
      });

      createBlogPhoto(formData, values.id, setFlashMessage);
    }
  };

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    // Determine which photo to update based on the name attribute
    const photoIndex = parseInt(name.split("[")[1].split("]")[0]);
    const photoToUpdate = values.blog_photos.find(
      photo => photo.id === photoIndex
    );

    let blogPhotos = values.blog_photos.map(photo =>
      photo === photoToUpdate ? { ...photo, main: checked } : photo
    );

    // Update the photo with the new value
    setValues({
      ...values,
      blog_photos: blogPhotos,
    });
  };

  const removePhoto = (e, indexToRemove) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to remove this photo?")) {
      URL.revokeObjectURL(values.blog_photos[indexToRemove].image.url);

      setValues({
        ...values,
        blog_photos: values.blog_photos.filter(
          (_, index) => index !== indexToRemove
        ),
      });

      deleteBlogPhoto(values.blog_photos[indexToRemove].id, setFlashMessage);
    }
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
            images_file_types: "jpg,jpeg,png,gif",
            images_upload_url: `${API_URL}/blog_photos?blog_post_id=${initialValues.id}`,
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      {values.id && (
        <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
          <label className="sm:w-auto w-full">Blog photos</label>
          <div className="field sm:w-1/4 w-full">
            <label>Image</label>
            <br />
            <input
              type="file"
              multiple
              name="blog_photos[image][]"
              onChange={handleFileChange}
              className=" appearance-none w-full text-gray-700 leading-tight"
            />
          </div>
          <div className="flex flex-wrap justify-between content-center flex-grow gap-2">
            {values.blog_photos?.map((photo, index) => (
              <div key={index} className="w-full sm:w-1/3">
                <button onClick={e => removePhoto(e, index)}>❌</button>
                <img
                  src={photo.image.url}
                  alt={`Uploaded Photo ${index + 1}`}
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                  className="m-auto pb-4"
                />
                <div className="flex gap-2">
                  <label>Main Photo?</label>
                  <input
                    checked={photo.main}
                    type="checkbox"
                    name={`blog_photos[${photo.id}][main]`}
                    onChange={handleChangePhoto}
                  ></input>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
