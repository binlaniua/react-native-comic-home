var React = require('react-native'),
  Css = require('../css/css');

var {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight
} = React;


var SearchView = React.createClass({

  getInitialState() {
    this.keyword = '';
    return {}
  },

  componentDidMount() {
  },

	componentWillUnmount() {
	},

  render() {
    return (
      <View style={[styles.searchContainer, Css.vCenter]}>
        <TextInput
          style={styles.searchInput}
          onChangeText={this._onChange}
          onSubmitEditing={() => {this.props.onSubmit(this.keyword)}}
          placeholder="请输入关键词"
          ></TextInput>
        <TouchableHighlight underlayColor="#cff4ff" style={[styles.searchBtn, Css.btn]} onPress={() => {this.props.onSubmit(this.keyword)}}>
          <Text>搜索</Text>
        </TouchableHighlight>
      </View>
    );
  },

  _onChange(txt) {
    this.keyword = txt;
  }

});

var styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    padding: 2
  },
  searchInput: {
    flex: 8,
    height: 32,
    borderColor: '#75e3ff',
    borderWidth: 1,
    borderRadius: 4
  },
  searchBtn: {
    flex: 2,
    height: 32
  }
});


module.exports = SearchView;
