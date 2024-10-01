import { useState,useEffect } from 'preact/hooks'
import data from './data';
import { nanoid } from 'nanoid';
import './app.css'

export function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState([]);
  const [copied, setCopied] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    setText(data.slice(0, amount));
  };
  const handleCopy = () => {
    if (text.length > 0) {
      navigator.clipboard.writeText(text.join('\n'))
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); 
          alert('Text copied to clipboard!');
 
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };
  return (
    <section className='section-center'>
      <h2>Tired of boring lorem ipsum?</h2>
      <form className='lorem-form' onSubmit={handleSubmit}>
        <label htmlFor='amount'>paragraphs:</label>
        <input
          type='number'
          name='amount'
          id='amount'
          min='1'
          step='1'
          max='8'
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button className='btn' type='submit'>
          generate
        </button>
        <button className='btn btn2'  type='button' onClick={handleCopy}>
        Copy
        </button>
      </form>
      <article className='text-generated' >
        {text.map((item) => {
          return <p key={nanoid()}>{item}</p>;
        })}
      </article>
    </section>
  );
}
