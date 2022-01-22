import { ChangeEvent, useEffect, useState } from 'react';

function useForm<T>(initial: T) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');
  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;

    let newValue: string | number | File = value;
    if (type === 'number') newValue = parseInt(value);
    // eslint-disable-next-line prefer-destructuring
    if (type === 'file' && e) newValue = e.target.files[0];

    setInputs({
      ...inputs,
      [name]: newValue,
    });
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
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

  return {
    inputs,
    handleInputChange,
    handleTextAreaChange,
    resetForm,
    clearForm,
  };
}

export default useForm;
