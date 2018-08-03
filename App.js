import React, { Component } from 'react';
import { View, Image } from 'react-native'; 
import { Container, Header, Content, Item, Footer, Input, Icon, Button, Text,
Left, Body, Card, CardItem, Thumbnail, Right } from 'native-base';
import axios from 'axios';


class App extends Component {
  constructor(){
    super();
    this.state={x:'', y:'',
    resto: []}
  }

  get = () => {
    
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.x}`;

    var config = {
      headers: { 'user-key': 'ec9cdf96d1779b0d2781c4d71db124bc' }
    };

    axios.get(url, config).then((ambilData) => {
      this.setState({
        resto: ambilData.data.restaurants,
      })
    })

  }
  render() {

    const data = this.state.resto.map((item, index) => {

      var data_nama = item.restaurant.name;
      var data_kota = item.restaurant.location.city;
      var data_alamat = item.restaurant.location.address;
      var data_harga = (item.restaurant.average_cost_for_two / 2);
      var data_gambar = item.restaurant.thumb;

    return (

      <View>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: data_gambar }} />
              <Body>
                <Text> {data_nama} </Text>
                <Text note> {data_kota} </Text>
              </Body>
            </Left>
            <Right>
              <Text> {data_harga} </Text>
            </Right>
          </CardItem>

          <CardItem>
            <Body>
              
              <Image source = {{ uri: data_gambar }}
              style={{height: 200, width:370, flex: 1}}/>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: 'black' }}>
                <Icon name="thumb-up" />
                <Text> {data_alamat} </Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </View>

    )
  })
      
    

    return (
      <Container>

        <Header searchBar rounded backgroundColor={'red'}>
          
          <Item>
            <Icon name="search" />
            <Input 
            placeholder="cari menu makanan..."
            onChangeText={(input)=>this.setState({y:input})} />
          </Item>
          
        </Header>
        <Header>
          <Button
            onPress={() => { this.setState({ x: this.state.y }); this.get() }}
            full light>
            <Text> LIHAT DAFTAR RESTO </Text>
          </Button>
        </Header>

        <Content>
       

        {data}


        </Content>
        <Footer></Footer>
      </Container>
    );
  }
}

export default App;