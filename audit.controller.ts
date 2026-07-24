import {Request,Response} from 'express';
import {auditUrl} from '../services/audit.service';
export async function audit(req:Request,res:Response){
 try{
  const data=await auditUrl(req.body.url);
  res.json({success:true,data});
 }catch(err:any){
  res.status(500).json({success:false,message:err.message});
 }
}
