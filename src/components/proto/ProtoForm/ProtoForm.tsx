import styles from './ProtoForm.module.css';

export interface ProtoFormField {
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  label?: string;
  width?: '1/3' | '1/2' | '2/3' | 'full';
}

export interface ProtoFormProps {
  fields?: ProtoFormField[];
  hasSubmitButton?: boolean;
  className?: string;
}

export function ProtoForm({
  fields = [
    { type: 'text', label: 'Input Field', width: 'full' },
    { type: 'email', label: 'Email Field', width: '1/2' },
    { type: 'select', label: 'Dropdown', width: '1/2' },
  ],
  hasSubmitButton = true,
  className = '',
}: ProtoFormProps) {
  const classNames = [styles['proto-form'], className]
    .filter(Boolean)
    .join(' ');

  const getWidthClass = (width?: string) => {
    switch (width) {
      case '1/3': return styles['proto-form__field--w-1/3'];
      case '1/2': return styles['proto-form__field--w-1/2'];
      case '2/3': return styles['proto-form__field--w-2/3'];
      default: return styles['proto-form__field--w-full'];
    }
  };

  return (
    <div className={classNames}>
      <div className={styles['proto-form__fields']}>
        {fields.map((field, index) => (
          <div key={index} className={`${styles['proto-form__field']} ${getWidthClass(field.width)}`}>
            {field.label && (
              <div className={styles['proto-form__label']}>
                <div className={styles['proto-form__label-text']}></div>
              </div>
            )}
            {field.type === 'textarea' ? (
              <div className={styles['proto-form__textarea']}></div>
            ) : field.type === 'checkbox' ? (
              <div className={styles['proto-form__checkbox-wrapper']}>
                <div className={styles['proto-form__checkbox']}></div>
                <div className={styles['proto-form__checkbox-label']}></div>
              </div>
            ) : (
              <div className={styles['proto-form__input']}></div>
            )}
          </div>
        ))}
      </div>
      {hasSubmitButton && (
        <div className={styles['proto-form__button']}>
          <div className={styles['proto-form__button-text']}></div>
        </div>
      )}
    </div>
  );
}
