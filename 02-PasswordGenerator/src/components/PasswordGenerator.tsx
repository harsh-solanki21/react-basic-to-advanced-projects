import { useState, useEffect, ChangeEvent } from 'react'
import styles from './passwordGenerator.module.css'

interface CheckboxProps {
  characters: boolean
  numbers: boolean
  symbols: boolean
}

const PasswordGenerator = () => {
  const [copyBtn, setCopyBtn] = useState<string>('Copy')
  const [password, setPassword] = useState<string>('')
  const [sliderValue, setSliderValue] = useState<number>(8)
  const [checkboxes, setCheckboxes] = useState<CheckboxProps>({
    characters: true,
    numbers: true,
    symbols: false,
  })
  const [error, setError] = useState<null | string>(null)

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(e.target.value))
  }

  const handleCheckboxChange = (checkboxName: keyof CheckboxProps) => {
    setCheckboxes({
      ...checkboxes,
      [checkboxName]: !checkboxes[checkboxName],
    })
  }

  const handleCopyClick = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy)
    setCopyBtn('Copied!')
    setTimeout(() => setCopyBtn('Copy'), 2000)
  }

  const isAtLeastOneChecked = Object.values(checkboxes).some(
    (checkbox) => checkbox
  )

  useEffect(() => {
    if (isAtLeastOneChecked) {
      const newPassword = passwordGeneratorAlgorithm(sliderValue, checkboxes)
      setPassword(newPassword)
      setError(null)
    } else {
      setPassword('')
      setError('Please check at least one checkbox!')
    }
  }, [sliderValue, checkboxes, isAtLeastOneChecked])

  const passwordGeneratorAlgorithm = (
    sliderValue: number,
    checkboxes: CheckboxProps
  ) => {
    const chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers: string = '0123456789'
    const symbols: string = '!@#$%^&*()_+[]{}|;:,.<>?'

    let selectedChars: string = ''

    if (checkboxes.characters) {
      selectedChars += chars
    }
    if (checkboxes.numbers) {
      selectedChars += numbers
    }
    if (checkboxes.symbols) {
      selectedChars += symbols
    }

    let password: string = ''
    for (let i: number = 0; i < sliderValue; i++) {
      const randomIndex: number = Math.floor(
        Math.random() * selectedChars.length
      )
      password += selectedChars[randomIndex]
    }

    return password
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Password Generator</div>
      <br />
      <div className={styles.inputField}>
        <input type='text' value={password} readOnly />
        <button onClick={() => handleCopyClick(password)}>{copyBtn}</button>
      </div>
      <br />
      <div className={styles.options}>
        <div className={styles.range}>
          <input
            type='range'
            min='1'
            max='100'
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <p>Length: {sliderValue}</p>
        </div>
        <div>
          <div className={styles.checkboxContainer}>
            <span className={styles.checkbox}>
              <input
                type='checkbox'
                name='characters'
                value='characters'
                checked={checkboxes.characters}
                onChange={() => handleCheckboxChange('characters')}
              />
              &nbsp; Characters
            </span>
            <span className={styles.checkbox}>
              <input
                type='checkbox'
                name='numbers'
                value='numbers'
                checked={checkboxes.numbers}
                onChange={() => handleCheckboxChange('numbers')}
              />
              &nbsp; Numbers
            </span>
            <span className={styles.checkbox}>
              <input
                type='checkbox'
                name='symbols'
                value='symbols'
                checked={checkboxes.symbols}
                onChange={() => handleCheckboxChange('symbols')}
              />
              &nbsp; Symbols
            </span>
          </div>
          {error ? <p className={styles.error}>{error}</p> : null}
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator
