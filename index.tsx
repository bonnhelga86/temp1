import { FC, useState } from "react";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Colors {
  colorId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Colors[];
}

interface Props {
  params: Param[];
  model: Model;
}

const PARAMS: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
];

const MODEL: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
  colors: [],
};

interface Data {
  name: string;
  label: string;
  value: string;
  type: string;
}

type changeFunction = (name: string, value: string) => void;

interface FormElementProps {
  param: Data;
  handleChangeValue: changeFunction;
}

const App: FC = () => {
  return (
    <div>
      <h1>Карточка товара</h1>
      <Form params={PARAMS} model={MODEL} />
    </div>
  );
};

const Form: FC<Props> = ({ params, model }) => {
  const getDefaultValues = (params: Param[], model: Model): Data[] => {
    const defaultValues = params.reduce((acc, { id, name, type }) => {
      const result: Data = {
        name: `el_${id}`,
        label: name,
        value:
          model.paramValues.find(({ paramId }) => paramId === id)?.value ??
          "Значение не задано",
        type,
      };
      acc.push(result);
      return acc;
    }, [] as Data[]);

    return defaultValues;
  };

  const [formValues, setFormValues] = useState<Data[]>(
    getDefaultValues(params, model)
  );

  const handleChangeValue: changeFunction = (name, value) => {
    formValues[formValues.findIndex((v) => v.name === name)].value = value;
    setFormValues([...formValues]);
  };

  const getModel = () => {
    const model = formValues.map((formValue) => {
      return [`${formValue.label}: ${formValue.value}`];
    });
    return model.join("\r\n");
  };

  return (
    <div>
      <form>
        {formValues.map((formValue) => {
          return (
            <FormElement
              key={formValue.name}
              param={formValue}
              handleChangeValue={handleChangeValue}
            />
          );
        })}
      </form>
      <pre>{getModel()}</pre>
    </div>
  );
};

const FormElement: FC<FormElementProps> = ({ param, handleChangeValue }) => {
  return (
    <div>
      <label>
        {param.label}:{" "}
        <input
          name={param.name}
          type={param.type}
          value={param.value}
          onChange={({ target: { value } }) =>
            handleChangeValue(param.name, value)
          }
        />
      </label>
    </div>
  );
};

export default App;
