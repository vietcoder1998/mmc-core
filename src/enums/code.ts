enum Code {
    success = 1,
    error = 0,
    not_found = -1,
    request_err = -2,
    err_private_key = -3,
    unknown = -4,
    error_block = -5,
    filter_err = -6,
    hash_error = -7,
    push_ql_error = -8,
    push_arr_error = -9,
    get_multi_error = -10,
    txs_not_found = -11,
    address_not_found = -12,
    full_node = -13,
}

export { Code }
