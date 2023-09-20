import { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {AuthContext} from '../../contexts/auth'
import { doc, deleteDoc } from "firebase/firestore";
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, limit, startAfter, query} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import { format } from 'date-fns'
import Modal from '../../components/Modal'

import './dashboard.css'

const listRef = collection(db, "chamados")

export default function Dashboard(){
  const { logout } = useContext(AuthContext);

  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true);

  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [loadingMore, setLoadingMore] = useState(false);

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState()


  useEffect(() => {
    async function loadChamados(){
      const q = query(listRef, orderBy('created', 'desc'), limit(5));

      const querySnapshot = await getDocs(q)
      setChamados([]);

      await updateState(querySnapshot)

      setLoading(false);

    }

    loadChamados();


    return () => { }
  }, [])


  async function updateState(querySnapshot){
    const isCollectionEmpty = querySnapshot.size === 0;

    if(!isCollectionEmpty){
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complemento: doc.data().complemento,
        })
      })

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // Pegando o ultimo item

      setChamados(chamados => [...chamados, ...lista])
      setLastDocs(lastDoc);

    }else{
      setIsEmpty(true);
    }

    setLoadingMore(false);

  }


  async function handleMore(){
    setLoadingMore(true);

    const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs),  limit(5));
    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);

  }


  function toggleModal(item){
    setShowPostModal(!showPostModal)
    setDetail(item)
  }


  if(loading){
    return(
      <div>
        <Header/>
        <div className="content">
          <Title name="Pedidos">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>Buscando pedidos...</span>
          </div>
        </div>
      </div>
    )
  }

  async function handleDelete(id) {
  try {
    await deleteDoc(doc(db, "chamados", id));
    setChamados(chamados.filter((item) => item.id !== id)); 
    toast.success("Pedido excluído com sucesso!");
  } catch (error) {
    toast.error("Erro ao tentar excluir o pedido.");
    console.error("Erro ao excluir pedido: ", error);
  }
}

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="">
          <FiMessageSquare size={25} />
        </Title>

        <>
          {chamados.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum pedido encontrado...</span>
              <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25} />
                Novo pedido
              </Link>  
            </div>
          ) : (
            <>
              <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25} />
                Novo pedido
              </Link>  

              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Pedido</th>
                    <th scope="col">Status</th>
                    <th scope="col">Tipo do Pedido</th>
                    <th scope="col">Consulta</th>
                  </tr>
                </thead>
                <tbody>
                  {chamados.map((item, index) => {
                    return(
                      <tr key={index}>
                        <td data-label="Cliente">{item.cliente}</td>
                        <td data-label="Pedido">{item.complemento}</td>
                        <td data-label="Status">
                          <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Assunto">{item.assunto}</td>
                        
                        <td data-label="#">
                          <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={ () => toggleModal(item)}>
                            <FiSearch color='#FFF' size={17}/>
                          </button>
                          <Link to={`/new/${item.id}`} className="action" style={{ backgroundColor: '#f6a935' }}>
                            <FiEdit2 color='#FFF' size={17}/>
                          </Link>
                          <button className="action" style={{ backgroundColor: '#f00' }} onClick={() => handleDelete(item.id)}>
                            <FiTrash2 color='#FFF' size={17}/>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>   


              {loadingMore && <h3>Buscando mais pedidos...</h3>}    
              {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button>  }  
            </>
          )}
        </>

      </div>

      {showPostModal && (
        <Modal
          conteudo={detail}
          close={ () => setShowPostModal(!showPostModal) }
        />
      )}
    
    </div>
  )
}