
import { Button, Input, Col, Row, Form, Select } from 'antd';
import axios from 'axios';
import React,{ useState } from 'react';
const url = "https://api.github.com/search/repositories?q=topic:"





const Home =() => {
	const [List,setList] = useState([]);
  	const { Option } = Select;


	function handleChange(value){
    	console.log(value)
  	}
  
  async function onSubmit(values){
	  const response = await axios.get(url+values.search)
	  const data = await response.data.items
	  let array = [] 
	  data.forEach(element => {
		  const repository = {
			  project: element.name,
			  owner : element.owner.login,
			  avatar : element.owner.avatar_url,
			  star:false
		  }
		  array.push(repository);
	  });


	  setList(array);
    console.log(List)
  }

  const Card = (item) => {
    return (
      <Card
        /*actions={[
          favoritos.find((it) => it.id === item.id) ? (
            <FaHeart onClick={() => removerFavorito(item)} />
          ) : (
            <FaRegHeart onClick={() => favoritar(item)} />
          ),
        ]}*/
        cover={<img alt="example" src={item.avatar} />}
      >
        <h3>
          <a href={item.project} target="_blank">
            {item.project}
          </a>
        </h3>
        <p>
          <a href={item.owner} target="_blank">
            {item.owner}
          </a>
        </p>
      </Card>
    );
  };





  return (
    <Form onFinish={onSubmit}>
    	<Col>
    		<Row>
    			<Button>Meus Favoritos</Button>
    		</Row>
    		<Row>
      			<Col>
      				<Select defaultValue="Opções" style={{ width: 120 }} onChange={handleChange}>
        				<Option value="Repositórios">Repositórios</Option>
        			</Select>
      			</Col>
      			<Col sm={4}>
      				<Form.Item name="search">
    					<Input id="search"/>
    				</Form.Item>
    			</Col>
    			<Col>
    				<Button htmlType="submit">Buscar</Button>
    			</Col>
    		</Row>
			<List
            grid={{ gutter: 16, column: 6 }}
            dataSource={List}
            pagination={{
              //total: totalCount,
              pageSize: 30,
              //onChange: changePage,
            }}
            renderItem={(item) => <List.Item>{Card(item)}</List.Item>}
          />
			
    	</Col>
    </Form>
    //
  )
}

export default Home;
