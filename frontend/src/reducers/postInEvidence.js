import { GET_POST } from '../actions/postInEvidence'

export default function postInEvidence(state = {}, action){
	switch(action.type){
		case GET_POST :
			return action.post
		default :
			return state
	}
}