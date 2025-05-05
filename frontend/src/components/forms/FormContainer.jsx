const FormContainer = ({ children, title, footer, onSubmit, className }) => {
  return (
    <form
      className={
        `bg-gray-900 shadow p-10 rounded-lg flex flex-col gap-4 sm:w-96 ` +
        className
      }
      onSubmit={onSubmit}
    >
      {title && (
        <h1 className="text-4xl font-extrabold text-emerald-400 text-center">
          {title}
        </h1>
      )}
      {children}
      {footer && <div className="text-center w-full">{footer}</div>}
    </form>
  );
};

export default FormContainer;
