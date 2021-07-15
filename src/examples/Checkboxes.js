import React from 'react';
import { useForm } from 'react-hook-form';
import './Checkboxes.css';

const Checkboxes = () => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues, watch } = useForm();
  const onSubmit = data => console.log(data);
  const watchAllFields = watch();


  function checkGroupValues(arg) {
    //check if all checkboxes in the group are either true or false (depend on func arg)
    const arr = getValues(["User auth", "Content Managment", "Payments"]);
    arr.every((val) => {
      return val === arg;
    });
  }

  function loadConfig(event) {
    switch (event.target.value) {
      case 'SaaS':
        setValue("User auth", true);
        setValue("Content Managment", true);
        setValue("Payments", true);
        setValue("AWS integration", false);
        setValue("SMS service", false);
        break;
      case 'SaaS + AWS':
        setValue("User auth", true);
        setValue("Content Managment", true);
        setValue("Payments", true);
        setValue("AWS integration", true);
        setValue("SMS service", true);
        break;
      case '':
        break;
      default:
        break;
    }
  }

  // TODO: add error handling for checkbox conflicts

  return (
    <div style={{
      display: 'flex',
    }}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div style={{ margin: '1rem' }}>
          Select application type:
          <select style={{ padding: '.5rem' }} onChange={(e) => loadConfig(e)}>
            <option selected disabled value="">-- choose option --</option>
            <option value="SaaS">SaaS</option>
            <option value="SaaS + AWS">SaaS + AWS</option>
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '400px',
            margin: '1rem',
            padding: '1rem',
            border: '2px solid black'
          }}>
          <label
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              borderBottom: '1px solid black'
            }}>
            <input type="checkbox" placeholder="User auth"
              // TODO: this checked conditional is probably wrong?
              checked={checkGroupValues(true) ? true : checkGroupValues(false) ? false : null}
              onChange={(e) => {
                setValue("User auth", e.target.checked);
                setValue("Content Managment", e.target.checked);
                setValue("Payments", e.target.checked);
              }}
            /><h1>SaaS basics</h1>
          </label>
          <label>
            <input type="checkbox" placeholder="User auth" {...register("User auth")} /> User auth
          </label>
          <label>
            <input type="checkbox" placeholder="Content Managment" {...register("Content Managment")} /> Content Managment
          </label>
          <label>
            <input type="checkbox" placeholder="Payments" {...register("Payments")} /> Payments
          </label>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '400px',
            margin: '1rem',
            padding: '1rem',
            border: '2px solid black'
          }}>
          <label
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              borderBottom: '1px solid black'
            }}>
            <input type="checkbox" placeholder="User auth"
              // TODO: this checked conditional is probably wrong?
              checked={checkGroupValues(true) ? true : checkGroupValues(false) ? false : null}
              onChange={(e) => {
                setValue("AWS integration", e.target.checked);
                setValue("SMS service", e.target.checked);
              }}
            /><h1>Cloud services</h1>
          </label>
          <label>
            <input type="checkbox" placeholder="AWS integration" {...register("AWS integration")} /> AWS integration
          </label>
          <label>
            <input type="checkbox" placeholder="SMS service" {...register("SMS service")} /> SMS service
          </label>
        </div>
        {/* <input type="submit" /> */}
      </form>
      <div 
      style={{
        marginTop: '3rem'
      }}>
        <h1>Form state: </h1>
        <p>{JSON.stringify(watchAllFields)}</p>

        <h1>Errors: </h1>
        <p>{JSON.stringify(errors)}</p>
      </div>
    </div>
  );

}

export default Checkboxes
