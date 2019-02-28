export default class extends React.Component {
  static async getInitialProps () {
    const { time } = await fetch('/time').then(resp => resp.json())
    return { time }
  }

  render () {
    return <p>Current time is: {this.props.time}</p>
  }
}
