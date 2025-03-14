package com.codeb.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeb.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

}