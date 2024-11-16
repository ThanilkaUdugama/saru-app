import React, { useEffect, useState } from "react";
import { ACCOUNTANT, CUSTOMER, SALESMAN, STORE_KEEPER } from "../..";
import { Form } from "../../classes/form";
import { ChooseFormField, CREATE, ImageUpload, NumberFormField, ProfileFormField, TextFormField } from "../../classes/form_fields";
import Table from '../../classes/table';
import { CustomContainer } from "../../components/containers";
import EntryAddButton from '../../components/entry_add_button';
import PageInfo from "../../components/page_info";
import { requestWrapper, setChoices } from "../../fns";
import Profile from "../../icons/profile";
import { getActions, getColumns, getRequestRouters, setPageState, setTriggers, getMutableFields, getMethods } from "../utils";

export default function RevenuePage({view, setPath}){
  const [state, setState] = setPageState()();
  const [rev_types, setRevTypes] = useState([])
  const [rev_types_representation, setRevTypesRepresentation] = useState([])
  const __post_data__ = ['revenue_id', 'description', 'amount', 'attachment', 'type']
  const __put_data__ = []

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] = getActions(state, setState, __post_data__[0])
  
  const columns = getColumns([
    {id : 'revenue_id', header : 'Revenue ID', type : 'text'},
    {id : 'type', header : 'Revenue Type', type : 'text', representation : rev_types_representation},
    {id : 'description', header : 'Description', type : 'text'},
    {id : 'amount', header : 'Amount', type : 'number'},
    {id : 'date', header : 'Date', type : 'date'},
    {id : 'time', header : 'Time', type : 'time'},
    {id : 'record_by_image', header : 'Record By', type : 'profile'},
  ]) 
  
  const router = getRequestRouters({GET : 'finance/revenue/'})
  const methods = getMethods(view, {create : [STORE_KEEPER, CUSTOMER, SALESMAN, ACCOUNTANT], update : [], delete : [STORE_KEEPER, CUSTOMER, SALESMAN, ACCOUNTANT]})
  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

 
  setTriggers(state, setState, {}, {[router.GET] : setRows, 'finance/revenuecategory/choices/' : setRevTypes, 'finance/revenuecategory/representation/' : setRevTypesRepresentation})()


    if (view == CUSTOMER){
      return <CustomContainer>
        <PageInfo name = {'Revenue'} path = {[{name : 'Transaction'}]} />
    <Table setPath = {setPath} state = {state} setState = {setFormState} dataAPI = {router.GET} columns = {columns} id_function = {(item) => item.revenue_id} />
    <Form setPath = {setPath} setFormContent = {setFormContentState}  itemName = {"Revenue Record"} methods = {methods} formOpen = {state.formOpen} postData = {post_data} putData = {put_data} router = {router} state={state} setState = {setFormState}>
        <TextFormField noAlter = {true} elementId = 'revenue_id' elementLabel = "Revenue ID" prefix = "ID" formState = {state} setFormState = {setFormContentState}/>
        <ChooseFormField noAlter = {true} representation ={rev_types_representation} elementId = 'type' elementLabel = "Revenue Category" options = {rev_types} formState = {state} setFormState = {setFormContentState}/>
        <TextFormField elementId = 'description' elementLabel = "Description" formState = {state} setFormState = {setFormContentState} />
        <NumberFormField prefix = 'LKR' elementId = 'amount' elementLabel = "Amount" min={0} formState = {state} setFormState = {setFormContentState} />
        <ImageUpload elementLabel = {"Attachment"} buttonText = {"Attachment"} style = {{height : '15vw', width : '30vw'}} elementId="attachment" formState = {state} setFormState = {setFormContentState} />
        <ProfileFormField elementId = 'record_by' elementLabel = "Record By" formState = {state} setFormState = {setFormContentState} />
    </Form>

    {methods.create && <EntryAddButton addButtonClick = {addButtonClick}/>}
    </CustomContainer>
    }

    return <div>
    <Table setPath = {setPath} state = {state} setState = {setFormState} dataAPI = {router.GET} columns = {columns} id_function = {(item) => item.revenue_id} />
    <Form setPath = {setPath} setFormContent = {setFormContentState}  itemName = {"Revenue Record"} methods = {methods} formOpen = {state.formOpen} postData = {post_data} putData = {put_data} router = {router} state={state} setState = {setFormState}>
        <TextFormField noAlter = {true} elementId = 'revenue_id' elementLabel = "revenue ID" prefix = "ID" formState = {state} setFormState = {setFormContentState}/>
        <ChooseFormField noAlter = {true} representation ={rev_types_representation} elementId = 'type' elementLabel = "Revenue Category" options = {rev_types} formState = {state} setFormState = {setFormContentState}/>
        <TextFormField elementId = 'description' elementLabel = "Description" formState = {state} setFormState = {setFormContentState} />
        <NumberFormField prefix = 'LKR' elementId = 'amount' elementLabel = "Amount" min={0} formState = {state} setFormState = {setFormContentState} />
        <ImageUpload elementLabel = {"Attachment"} buttonText = {"Attachment"} style = {{height : '15vw', width : '30vw'}} elementId="attachment" formState = {state} setFormState = {setFormContentState} />
        <ProfileFormField elementId = 'record_by' elementLabel = "Record By" formState = {state} setFormState = {setFormContentState} />
    </Form>

    {methods.create && <EntryAddButton addButtonClick = {addButtonClick}/>}
    </div>

    }