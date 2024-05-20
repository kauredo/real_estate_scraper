import { useState } from "react";
import {
  createVariable,
  updateVariable,
  deleteVariable,
} from "../../../utils/setters";

export default function VariableForm({ variable, variables, setVariables }) {
  const [name, setName] = useState(variable?.name);
  const [value, setValue] = useState(variable?.value);
  const [icon, setIcon] = useState(variable?.icon);

  const handleSubmit = event => {
    event.preventDefault();

    if (variable) {
      updateVariable(variable.id, { name, value, icon });
      setVariables(
        variables.map(v =>
          v.id === variable.id ? { ...v, name, value, icon } : v
        )
      );
    } else {
      createVariable({ name, value, icon });
      setVariables([...variables, { name, value, icon }]);
    }
  };

  const handleDelete = id => {
    deleteVariable(id);
    setVariables(variables.filter(v => v.id !== id));
  };

  const classes =
    "shadow appearance-none border rounded w-full sm:w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  return (
    <form onSubmit={handleSubmit}>
      <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={name}
          placeholder="Nome da variável"
          onChange={e => setName(e.target.value)}
          className={classes}
        />
        <input
          type="text"
          value={value}
          placeholder="Valor da variável"
          onChange={e => setValue(e.target.value)}
          className={classes}
        />
        <input
          type="text"
          value={icon}
          placeholder="Ícone da variável"
          onChange={e => setIcon(e.target.value)}
          className={classes}
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {variable ? "Atualizar" : "Criar"}
          </button>
          {variable && (
            <button
              className="bg-red-500 hover:bg-red-700 p-2 rounded font-bold"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this item?")
                ) {
                  handleDelete(variable.id);
                }
              }}
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
