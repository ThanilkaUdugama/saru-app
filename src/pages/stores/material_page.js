import React, { useState } from "react";
import { STORE_KEEPER } from "../..";
import { Form } from "../../classes/form";
import { BooleanFormField, ChooseFormField, NumberFormField, ProfileFormField, TextFormField } from "../../classes/form_fields";
import Table from '../../classes/table';
import { CustomContainer } from "../../components/containers";
import EntryAddButton from '../../components/entry_add_button';
import PageInfo from "../../components/page_info";
import { colors_list, colors_representation } from "../data";
import { getActions, getColumns, getMethods, getMutableFields, getRequestRouters, setPageState, setTriggers } from "../utils";

export default function MaterialPage({view, setPath}){
    const [units, setUnits] = useState([])
    const [units_representation, setUnitsrepresentation] = useState({})
    const __post_data__ = ['material_id', 'description', 'color', 'unit_price', 'buying_unit','allocation_unit', 'translation']
    const __put_data__ = [ 'description', 'unit_price', 'buying_unit','allocation_unit','translation']
    const [state, setState] = setPageState()();
    const [addButtonClick, setFormState, setFormContentState, setRows, setId] = getActions(state, setState, __post_data__[0])
    
    const columns = getColumns([
      {id : 'material_id', header : 'Material ID', type : 'text'},
      {id : 'description', header : 'Description', type : 'text'},
      {id : 'quantity', header : 'Quantity', type : 'number'},
      {id : 'buying_unit', header : 'Unit', type : 'text', representation : units_representation},
      {id : 'color', header : 'Color', type : 'color'},
      {id : 'unit_price', header : 'Unit Price', type : 'number', prefix : 'LKR', decimals : 2},
      {id : 'record_by_image', header : 'Record By', type : 'profile'},
    ]) 

    const post_data = getMutableFields( [STORE_KEEPER], __post_data__)
    const put_data = getMutableFields( [STORE_KEEPER], __put_data__)
    const router = getRequestRouters({GET : 'stores/material/'})
    const methods = getMethods(view, {create : [STORE_KEEPER], update : [STORE_KEEPER], delete : [STORE_KEEPER]})
    
    setTriggers(state, setState, {'generate_id/MAT/' : setId}, {[router.GET] : setRows, 'stores/material/units/choices/' : setUnits, 'stores/material/units/representation/' : setUnitsrepresentation})()


    return <CustomContainer>
                    <PageInfo name = "Materials" path = {[{name : 'Stores'}]} />
    <Table setPath = {setPath} state = {state} setState = {setFormState} dataAPI = {router.GET} columns = {columns} id_function = {(item) => item.material_id} />
    <Form setPath = {setPath} setFormContent = {setFormContentState} itemName = {"Material"} methods = {methods} formOpen = {state.formOpen} postData = {post_data} putData = {put_data} router = {router} state={state} setState = {setFormState}>
        <TextFormField noAlter = {true} elementId = 'material_id' elementLabel = "Material ID" prefix = "ID" formState = {state} setFormState = {setFormContentState}/>
        <TextFormField elementId = 'description' elementLabel = "Description" formState = {state} setFormState = {setFormContentState} />
        <ChooseFormField noAlter = {true} representation = {colors_representation} elementId = 'color' elementLabel = "Color" options = {colors_list} formState = {state} setFormState = {setFormContentState}/>
        <ChooseFormField noAlter = {true} representation = {units_representation} elementId = 'buying_unit' elementLabel = "Buying Unit" options = {units} formState = {state} setFormState = {setFormContentState}/>
        <BooleanFormField elementId = 'translation?' elementLabel = "Different Allocation Unit" formState = {state} setFormState = {setFormContentState} onChange = {() => setFormContentState({'translation' : ''})}/>
        {(state.formContent['translation?'] == true || state.formContent['translation']) && <ChooseFormField noAlter = {true} representation = {units_representation} elementId = 'allocation_unit' elementLabel = "Allocation Unit" options = {units} formState = {state} setFormState = {setFormContentState}/>}
        {(state.formContent['translation?'] == true || state.formContent['translation']) && <NumberFormField parentId = {'allocation_unit'} prefix = {`1 ${units_representation[state.formContent['allocation_unit']]} Equals to`} suffix = {units_representation[state.formContent['buying_unit']]} elementId = 'translation' elementLabel = "Translation" min={0} formState = {state} setFormState = {setFormContentState} />}
        <NumberFormField  prefix ='LKR' elementId = 'unit_price' elementLabel = {`${state.formContent['buying_unit'] ? `1 ${units_representation[state.formContent['buying_unit']]}` : 'Unit'} Price`} min={0} formState = {state} setFormState = {setFormContentState} />
        <ProfileFormField elementId = 'record_by' elementLabel = "Record By" formState = {state} setFormState = {setFormContentState} />
    </Form>
    {methods.create && <EntryAddButton addButtonClick={addButtonClick} />}    
    </CustomContainer>

    }
