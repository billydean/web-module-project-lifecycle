import React from 'react'

export default class Form extends React.Component {
  onSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit();
  }
  onChange = evt => {
    const {value} = evt.target;
    this.props.onChange(value);
  }
  render() {
    const {input, remove} = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input 
            type='text'
            placeholder='Type todo'
            value={input}
            onChange={this.onChange}
          />
          <input 
            type='submit'
          />
        </form>
        <input 
          type='button'
          name='hide'
          value='Remove Completed'
          onClick={ remove }
        />
      </div>
    )
  }
}
