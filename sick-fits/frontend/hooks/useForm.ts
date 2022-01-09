import { ChangeEvent, useState } from 'react';

function useForm<T>(initial: T) {
  const [inputs, setInputs] = useState(initial);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;

    let newValue: string | number | Array<FileList> = value;
    if (type === 'number') newValue = parseInt(value);
    if (type === 'file') newValue[0] = e.target.files;

    setInputs({
      ...inputs,
      [name]: newValue,
    });
  };

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const newForm = { ...inputs };
    Object.keys(inputs).forEach((key) => {
      if (typeof newForm[key] === 'number') {
        newForm[key] = 0;
        return;
      }
      newForm[key] = '';
    });
    setInputs(newForm);
  }

  return { inputs, handleChange, resetForm, clearForm };
}

export default useForm;
