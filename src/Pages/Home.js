import { Button, Input, Col, Row, Form, Select, List, Card } from 'antd';
import axios from 'axios';
import React,{ useState } from 'react';
import { FaHeart, FaRegHeart} from 'react-icons/fa';
const url = "https://api.github.com/search/"






const Home = () =>{
	const [list,setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [favList, setFavList] = useState([]);
	const [toogle,setToogle] = useState(false);
	const [cont,setCont] = useState(0);
	const [option, setOption] = useState('repositories');
  	const { Option } = Select;


	function handleChange(value){
		setOption(value)
  	}
  
  async function onSubmit(values){
	  //repositories?q=topic:" -> REPOSITORIOS
	  //search/users?q=MrDuckBr -> users
	  
	setLoading(true);
	  const response = await axios.get(url+ option+'?q='+values.search);
	  setCont(response.total_count)
	  let array = [] 
	  const data = await response.data.items
	  if(option === 'repositories'){
		  
	  		
	  		data.forEach(element => {
				const repository = {
				id: new Date(),
				project: element.name,
				owner : element.owner.login,
				avatar : element.owner.avatar_url,
				star:false
				}
				array.push(repository);
		 	});
		}else{

	  		data.forEach(element => {
				const repository = {
				id: new Date(),
				project: element.name,
				owner : element.type,
				avatar : element.avatar_url,
				star:false
				}
				array.push(repository);
		 	});


		}

	  setList(array);
    console.log(list)
	setLoading(false);
	console.log('PASSEI AQUI')
  }

  function favorites(){
	let array = []
	 list.map((itens)=>{
		if(itens.star === true){
			array.push(itens)
		}
	})
	setFavList(array)
}

  function adicionarFav(item){
	  console.log(item)
	 const newList = list.map((t)=>{
		  if(item.avatar === t.avatar){
			  t.star = true;
		  }
		  return t;
	  })
	  setList(newList)
  }
  
  function removerFav(item){
	console.log(item)
   const newList = list.map((t)=>{
		if(item.id === t.id){
			t.star = false;
		}
		return t;
	})
	setList(newList)
}

function toogleList(){
	favorites()
	if(toogle === false){
		setToogle(true)
		
	}else{
		setToogle(false)
	}
}




  return (
    <Form onFinish={onSubmit}>
    	<Col>
    		<Row>
    			<Button onClick={toogleList}>Meus Favoritos</Button>
    		</Row>
    		<Row>
      			<Col>
      				<Select defaultValue="Opções" style={{ width: 120 }} onChange={handleChange}>
        				<Option value="repositories">Repositórios</Option>
						<Option value="users">Users</Option>
        			</Select>
      			</Col>
      			<Col sm={4}>
      				<Form.Item name="search">
    					<Input id="search"/>
    				</Form.Item>
    			</Col>
    			<Col>
    				<Button loading={loading} htmlType="submit">Buscar</Button>
    			</Col>
    		</Row>
			{toogle === false ?
			<List
			loading={loading}
            grid={{ gutter: 5, column: 5 }}
            dataSource={list}
			pagination={{
				//total: cont,
				pageSize: 30,
				//onChange: changePage,
			  }}
            renderItem={(item) => <List.Item>
				 <Card cover={<img alt="example" src={item.avatar} />}>
	   				<h3> {item.project}</h3>
	   				<p>{item.owner}</p>
					   {item.star === false ? 
					   <FaRegHeart onClick={() => adicionarFav(item)}/>: <FaHeart onClick={() => removerFav(item)}/>}
					   
	 			</Card>
			</List.Item>}
          />
			:
			<List
			loading={loading}
            grid={{ gutter: 5, column: 5 }}
            dataSource={favList}
			pagination={{
				//total: totalCount,
				pageSize: 30,
				//onChange: changePage,
			  }}
            renderItem={(item) => <List.Item>
				 <Card cover={<img alt="example" src={item.avatar} />}>
	   				<h3> {item.project}</h3>
	   				<p>{item.owner}</p>
					   {item.star === false ? 
					   <FaRegHeart onClick={() => adicionarFav(item)}/>: <FaHeart onClick={() => removerFav(item)}/>}
					   
	 			</Card>
			</List.Item>}
          />
			
			}
    	</Col>
    </Form>
    //
  )
}

export default Home;